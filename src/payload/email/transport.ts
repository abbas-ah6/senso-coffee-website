let email

// if (process.env.NODE_ENV === 'production') {
  email = {
    fromName: 'Muhammad Abbas',
    fromAddress: 'abbas143186@gmail.com',
    transportOptions: {
        service: 'gmail',
        auth: {
          user: 'abbas143186@gmail.com',
          pass: 'wdry masq qppt bfyb',
        },
    },
  }

// } else {
//   email = {
//     fromName: 'Ethereal Email',
//     fromAddress: 'example@ethereal.com',
//     logMockCredentials: true,
//   }
// }

export default email