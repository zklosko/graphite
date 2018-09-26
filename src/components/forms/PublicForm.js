import React, { Component } from "react";
// import { Link } from 'react-router-dom';

export default class PublicForm extends Component {

  componentDidMount() {
    this.props.loadPublicForm();
  }


  render() {
    const { publicForm, formContents } = this.props;
    console.log(formContents)
    return(
      <div>
        <div>
          <h3>{publicForm.title}</h3>
          <form>
          {
            formContents.map(q => {
              return (
                <div>
                <h5>
                  {q.questionTitle}
                </h5>
                <div>
                {
                  q.questionType === "singleLine" || q.questionType === "paragraph" || q.questionType === "email" || q.questionType === "number" ?
                  <input type="text" name={q.questionTitle} /> :
                  q.questionType === "multipleChoice" ?
                  <div>
                  {
                    q.options.map(o => {
                      return(
                        <div key={o.id}>
                        <input  type="radio" checked={false} value={o.option} name={o.option} />
                        <label>
                        {o.option}
                        </label>
                        </div>
                      )
                    })
                  }
                  </div> :
                  q.questionType === "dropdown" ?
                  <select>
                  {
                    q.options.map(o => {
                      return (
                        <option key={o.id} value={o.option}>{o.option}</option>
                      )
                    })
                  }
                  </select> :
                  q.questionType === "checkbox" ?
                  <div>
                  {
                    q.options.map(o => {
                      return(
                        <label> {o.option}
                        <input type="checkbox" key={o.id} name={o.option} />
                        </label>
                      )
                    })
                  }
                  </div> :
                  null
                }
                </div>
                </div>
              )
            })
          }
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}