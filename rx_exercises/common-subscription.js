const commonSubscription = [
  x => console.log('next ', x),
  error => console.error(error),
  () => console.log('done')
];

export default commonSubscription;