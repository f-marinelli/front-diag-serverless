// export const sendData = (data) => {
//   return new Promise((resolve, reject) => {
//     const res = fetch('https://thawing-sea-66147.herokuapp.com', {
//       method: 'POST',
//       body: data,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     if (res.ok) {
//       resolve(res.text());
//     }

//     return reject();
//   });
// };
export const sendData = async (data) => {
  const res = await fetch('https://thawing-sea-66147.herokuapp.com', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const text = await res.text();

  return text;
};
