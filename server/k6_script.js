// Creator: k6 Browser Recorder 0.5.3
import { Rate } from 'k6/metrics';
import http from "k6/http";

let errorRate = new Rate('errorRate');

export let options ={
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { target: 10, duration: '30s' },
        { target: 100, duration: '30s' },
        { target: 200, duration: '30s' }
      ]
    }
  }
};

export default function () {
  let random = Math.floor(Math.random() * 9999999) + 1
  // let random2 = Math.floor(Math.random() * 9999999) + 1
  let res = http.get(`http://localhost:3001/lodge/${random}`, { tags: { name: 'LodgeURL' } });
  // let res2 = http.post(`http://localhost:3001/reserve/${random2}`, { tags: { name: 'ReserveURL' } });

  errorRate.add(res.status >= 400);
  // errorRate.add(res2.status >= 400);
  }