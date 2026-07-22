import dns from 'dns';

dns.resolveSrv('_mongodb._tcp.m0.cj5vlr1.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('SRV Resolution failed:', err);
  } else {
    console.log('SRV Records:', addresses);
  }
});
