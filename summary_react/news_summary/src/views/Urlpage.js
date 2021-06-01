import React, {Component} from 'react'
import axios from "axios";
import {
  Button,
  FormControl,
  Form,
  InputGroup ,
  Spinner,
  Container
} from 'react-bootstrap'

import styles from './Urlpage.module.css';

class Summary extends Component {
  state = {
    url : "",
    text : "",
    summary : "",
    loading : null
  };
  
  handleChange= (e) => {
    this.setState({
        text : e.target.value 
    });
    setTimeout(this.handleCheck, 100);       
  }
  submit = async (e) => {
    e.preventDefault();
    this.setState( {loading : true} );
    const {
      data: { text, summary },
    } = await axios({
      method: "post",
      url: "/summary",
      data: {
        'url' : this.state.url
      },
    }).then();
    this.setState({ text : text, summary: summary, loading : null });
    console.log(this.state.summary)
  };


  render(){
    return (
      <>
      <div className={styles.header}>
        <h1>웹사이트 뉴스 요약</h1>
        <p>원하는 뉴스 기사 URL 작성!</p>
      </div>
      <Form>
        <Form.Group  className={styles.Form}>
          <InputGroup className={styles.textarea} size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text>URL</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className={styles.textarea} as="textarea" aria-label="With textarea" placeholder="URL 입력"  
            value = {this.state.text}
            onChange = {this.handleChange}/>
          </InputGroup>
        </Form.Group>
        {
          this.state.loading ? <Button className={styles.Button} variant="success" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
           Loading...
        </Button>
          : <Button className={styles.Button} variant="success" type="submit" onClick={this.submit}>요약</Button>
        }
      </Form>
      <div className={styles.news}>
        {this.state.summary ?
          <>
          <h2>뉴스 원문</h2> 
          <p>{this.state.text}</p>
          <br></br>
          <h2>요약 결과</h2> 
          <p>{this.state.summary}</p>
          </> : ""
        }
      </div>
      </>
      );
    }
}
export default Summary;
