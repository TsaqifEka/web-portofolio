import { supabase } from '@/app/lib/supabase'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('project_id')
  const reviewerId = request.headers.get('x-reviewer-id')

  if (!projectId) {
    const { data, error } = await supabase.from('reviews').select('project_id, rating')
    if (error) return Response.json({ error: error.message }, { status: 500 })
    const map = {}
    if (data) {
      for (const r of data) {
        if (!map[r.project_id]) map[r.project_id] = { sum: 0, count: 0 }
        map[r.project_id].sum += r.rating
        map[r.project_id].count++
      }
    }
    const projects = {}
    for (const [id, val] of Object.entries(map)) {
      projects[id] = {
        average: Math.round((val.sum / val.count) * 10) / 10,
        count: val.count,
      }
    }
    return Response.json({ projects })
  }

  const { data: all, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('project_id', projectId)

  if (error) return Response.json({ error: error.message }, { status: 500 })

  let average = 0
  let count = 0
  let userRating = null

  if (all?.length) {
    count = all.length
    average = Math.round((all.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
  }

  if (reviewerId) {
    const { data: user } = await supabase
      .from('reviews')
      .select('rating')
      .eq('project_id', projectId)
      .eq('reviewer_id', reviewerId)
      .maybeSingle()
    if (user) userRating = user.rating
  }

  return Response.json({ average, count, userRating })
}

export async function POST(request) {
  const { project_id, rating } = await request.json()
  const reviewerId = request.headers.get('x-reviewer-id')

  if (!project_id || !rating || !reviewerId) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return Response.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
  }

  const { error } = await supabase.from('reviews').upsert(
    { project_id, rating, reviewer_id: reviewerId },
    { onConflict: 'project_id,reviewer_id' }
  )

  if (error) return Response.json({ error: error.message }, { status: 500 })

  const { data: stats } = await supabase
    .from('reviews')
    .select('rating')
    .eq('project_id', project_id)

  const count = stats?.length || 0
  const average = count > 0
    ? Math.round((stats.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
    : 0

  return Response.json({ success: true, average, count })
}
