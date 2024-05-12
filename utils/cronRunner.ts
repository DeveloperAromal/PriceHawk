import axios from 'axios';

export async function runCronJob(): Promise<void> {
  try {
    const response = await axios.get('/api/cron');
    console.log(response.data);
  } catch (error) {
    console.error('Error running cron job:', error);
  }
}
