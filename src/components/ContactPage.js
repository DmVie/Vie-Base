import React from 'react'

const ContactPage = () => {
  return (
    <>
      <section className="sect">
        <div className="inner-contact-wrapper">
          <h1 className="contains-icon">Contact Me <i className="fas fa-envelope-open-text"></i></h1>
          <p>To get in touch,  fill out the form below along with your preferred means of contact,  and I'll get right back to you :)</p>
        </div>
      </section>
      <section className="sect contact-page">
        <div className="inner-contact-wrapper">
          <form>
            <div className="contact-name">
              <div className="center-el">
                <label htmlFor="name">Your Name:</label><br />
                <input type="text" id="name" name="name" aria-required="true" />  
              </div>      
            </div>
            <div className="contact-email">
              <div className="center-el">
                <label htmlFor="email">Email</label><br />
                <input type="email" id="email" name="email" />     
              </div>
            </div>          
            <div className="contact-last-name">
              <div className="center-el">
                <input type="text" name="last-name" id="last-name"  tabIndex="-1" autoComplete="off" style={thisStyle}/>
              </div>               
            </div>
            <div className="contact-message">
              <div className="center-el">
                <label htmlFor="message">Message</label><br />
                <textarea name="message" id="message" cols="30" rows="10" aria-required="true"></textarea>
              </div>
            </div>
            <div className="contact-button">
              <div className="center-el">
                <button className="button button--btn1">Send Message</button>  
              </div>                      
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

const thisStyle = {
  display: 'none'
}

export default ContactPage
