import { mail } from '../lib/mail'

export default {
  key: 'registrationMail',
  options: {},
  async handle({ data }: { data: { email: string; authLink: URL } }) {
    mail.sendMail({
      from: {
        name: 'Pizza Shop',
        address: 'hi@pizzashop.com',
      }, // sender address
      to: data.email, // list of receivers
      subject: 'Authenticate to Pizza Shop', // Subject line
      text: `Use the following to authenticate on Pizza Shop: ${data.authLink.toString()}`, // plain text body
      html: `<p>Use the following to authenticate on Pizza Shop: <a href="${data.authLink.toString()}" target="_blank">LINK</a></p>`,
    })
  },
}
