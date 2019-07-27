// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { QrCodesPrinter } from './';
import { ScheduledJobs, ScheduledJob } from './';

export default {
  path: 'staff',
  childRoutes: [
    { path: 'qr_codes', component: QrCodesPrinter },
    { path: 'scheduler/:jobId', component: ScheduledJob },
    { path: 'scheduler', component: ScheduledJobs },
  ],
};
