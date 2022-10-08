import { Layout } from '@components/common'
import React from 'react'
import styles from "./contact.module.scss"
import { Input, TextField , Grid} from '@mui/material'
import Box from '@mui/material'
import {AiOutlineSend} from "react-icons/ai"
import { Button } from '@components/ui'

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
        
        <div className={styles.logoContainer}>
           <img src="Vexr-group-logo.webp" alt="Vexr group Logo" className={styles.logo} />
        </div>
        <div className={styles.info}>
            <h1>Contact</h1>
            {/* <form action="" method='post'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required minLength={2} maxLength={30}/>

                <label htmlFor="lastName" >Last Name</label>
                <input type="text" id='lastName' required minLength={2} maxLength={30}/>
                <button type='submit'>Send</button>
            </form> */}
            <form action="" autoComplete='on'>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            required id='firstName' 
                            label="First Name"
                            type="text"
                            InputProps={{}
                            }
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            required id='lastName' 
                            type="text"
                            label="Last Name"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            type="email"
                            required
                            id='email'
                            label="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            type="text"
                            required
                            id='subject'
                            label="Subject"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            type="text"
                            id="text"
                            label="Text"
                            required
                            minRows={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid item >
                        <Button 
                            type='submit' 
                            className={styles.sendBtn}
                        >Submit &nbsp;<AiOutlineSend/></Button>
                    </Grid>
                </Grid>

            </form>
        </div>
    </div>
  )
}
Contact.Layout = Layout

export default Contact