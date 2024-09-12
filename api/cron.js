import { fetchCourses } from '../fetch_courses.js';

export default async function handler(req, res) {
  try {
    const result = await fetchCourses();
      if(result)
        res.status(200).send('All courses are fetched');
  } catch (error) {
    console.error('Error in /fetch-courses route:', error);
    res.status(500).send('Failed to fetch and insert courses');
  }
}
