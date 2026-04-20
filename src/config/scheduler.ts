import cron from 'node-cron';
import { generateDailyBakeList } from '../api/v1/services/bakeListService';

export const initScheduler = () => {
  // Test Pattern: '* * * * *' (Runs every minute for testing)
  // Real Pattern: '0 19 * * *' (Runs at 7:00 PM closing time)
  // (minute, hour, day of month, month, day of week)
  
  cron.schedule('* * * * *', async () => {
    console.log('[Scheduler] Starting nightly Bake List...');
    
    try {
        // Calculate the date for tomorrow's pickup
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateString = tomorrow.toISOString().split('T')[0];

        // Trigger the service to sum up the kakanin totals (not implemented yet)
        await generateDailyBakeList(dateString);
        
        console.log(`[Scheduler] Successfully triggered Bake List for ${dateString}`);
    } catch (error) {
        console.error('[Scheduler] Task failed:', error);
    }
  });

  console.log('[Scheduler] Node-cron tasks have been initialized.');
};