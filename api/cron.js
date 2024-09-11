import { fetchCourses } from '../fetch_courses.js';

export default async function handler(req, res) {
  try {
    await fetchCourses();
    res.status(200).send('Courses fetched and inserted successfully.');
  } catch (error) {
    console.error('Error in /fetch-courses route:', error);
    res.status(500).send('Failed to fetch and insert courses');
  }
}
