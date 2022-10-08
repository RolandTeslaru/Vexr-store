import React from 'react'
import styles from "../styles/Help.module.scss"
import type { GetStaticPropsContext } from 'next'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Collapse } from '@components/ui'
import Refund from '@components/policies/Refund'
import Privacy from '@components/policies/Privacy'
import questionsForm from "../info/questions"

const help = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.helpContainer}>
        <div className={styles.logoContainer}>
          <img src="Vexr-group-logo.webp" alt="Vexr group Logo" className={styles.logo} />
          {/* <h4>Logo</h4> */}
        </div>
        <div className={styles.content}>
          <div className={styles.policies}>
            <h1>Policies</h1>
            <Collapse title='Refund Policy' color="black" initialState={false}>
              <Refund/>
            </Collapse>
            <Collapse title='Privacy Policy' color="black" initialState={false}>
              <Privacy/>
            </Collapse>
            <Collapse title='Terms of service' color="black" initialState={false}>
              <Privacy/>
            </Collapse>
          </div>
          <div className={styles.questions}>
            <h1>Questions</h1>
            {questionsForm.map((question , index) => (
              <Collapse 
                title={question.title} 
                key={index} 
                color="black" 
                initialState={false}
              >{question.txt}</Collapse>
            ))}
          </div>  
        </div>
      </div>

    </div>
  )
}
help.Layout = Layout

export default help
