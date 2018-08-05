import React from 'react';
import Error from './Error';
import styles from './style.js';

class Form2 extends React.Component
{
	constructor(props)
	{
		super(props);
    this.state = {
      categories: sessionStorage.getItem("categories")?JSON.parse(sessionStorage.getItem("categories").toString()):[] ,
      selectedCategoryId: sessionStorage.getItem("selectedCategoryId"),
      selectedCategoryValue: sessionStorage.getItem("selectedCategoryValue"),
      issueDate: '',
			message:''
    }
    this.setValue = this.setValue.bind(this);
	}

  setValue(e)
  {
    let name = e.target.name;
    let value = e.target.value;
    let changePage = false;
    switch(name)
    {
      case "category":
        changePage = false;
        if(value !== sessionStorage.getItem("selectedCategoryValue"))
        {
          changePage = true;
          sessionStorage.setItem("selectedCategoryValue", value);
          sessionStorage.setItem("selectedCategoryId", e.target.options[e.target.selectedIndex].getAttribute('data-categoryId'));
					sessionStorage.setItem("from2", true);
          alert("Category changed! Navigating to previous page.");
        }
        this.setState({selectedCategory: value}, () => {if(changePage) window.location = '/';});
        break;

      case "date":

        changePage = false;
        if(new Date(value).setHours(0,0,0,0) > new Date().setHours(0,0,0,0))
        {
          this.setState({message:"Date cannot be a future date!"});
        }
        else if(new Date(value).setHours(0,0,0,0) < new Date(sessionStorage.getItem("date")).setHours(0,0,0,0))
        {
          changePage = true;
						this.setState({message:"Issue date cannot be lesser than instance date: "+sessionStorage.getItem("date") +". Please navigate to previous page & update the instance date."});
        }
        else this.setState({issueDate: value, message: ''}, () => {
					sessionStorage.setItem("issueDate", value);
				})
        break;
    }
  }

  componentDidMount()
  {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy +'-'+mm+'-'+dd;
    this.setState({issueDate: sessionStorage.getItem("issueDate")?sessionStorage.getItem("issueDate"): today});
  }

	render()
	{
  let state= this.state;
  let categories = [];
  categories.push.apply(categories, this.state.categories.map((category) => <option key={category.id} data-categoryId={category.id} value={category.value}>{category.value}</option>));

	return  (
		<div style={styles.container}>
		<form onSubmit={ (e) => {e.preventDefault();}}  style={styles.form}>
			Category
      <select name="category" onChange={(e) => this.setValue(e)} value={this.state.selectedCategoryValue} style={styles.input} >
        {categories}
      </select>

      Issue Date
      <input type="date" value={this.state.issueDate} name="date" onChange={(e) => this.setValue(e)} style={styles.input} required />
			<br />
      <button onClick={() => { sessionStorage.setItem("from2", true); window.location = '/';}} style={styles.btn}>Change product</button>
    </form>
		<br/>
		<Error >{this.state.message}</Error>
		</div>
		)
	}
}

export default Form2;
