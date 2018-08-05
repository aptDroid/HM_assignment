import React from 'react';
import { connect } from 'react-redux';
import Error from './Error';
import styles from './style.js';

class Form1 extends React.Component
{
	constructor(props)
	{
		super(props);
    this.state = {
      name: sessionStorage.getItem("name")?sessionStorage.getItem("name"):'',
      age: sessionStorage.getItem("age")?sessionStorage.getItem("age"):0,
      phno: sessionStorage.getItem("phno")?sessionStorage.getItem("phno"):'',
      selectedCategoryId: sessionStorage.getItem("selectedCategoryId")?sessionStorage.getItem("selectedCategoryId"):'',
      selectedCategoryValue: sessionStorage.getItem("selectedCategoryValue")?sessionStorage.getItem("selectedCategoryValue"):'',
      selectedProductId: sessionStorage.getItem("selectedProductId")?sessionStorage.getItem("selectedProductId"):'',
      selectedProductValue: sessionStorage.getItem("selectedProductValue")?sessionStorage.getItem("selectedProductValue"):'',
      date: sessionStorage.getItem("date")?sessionStorage.getItem("date"):'',
			message: ''
    }

		if(!sessionStorage.getItem("initial"))
		{
			sessionStorage.setItem("initial", true);
		}

    this.setValue = this.setValue.bind(this);
    this.validateAndSave = this.validateAndSave.bind(this);
	}

  setValue(e, attr='')
  {
    let name = e.target.name;
    let value = e.target.value;
    switch(name)
    {
      case "name":
        this.setState({name: value});
        break;
      case "age":
        if(value >= 18)
          this.setState({age: value, phno: ''});
        else
          this.setState({age: value});
        break;
      case "phno":
        this.setState({phno: value});
        break;
      case "category":
        this.setState({selectedCategoryValue: value, selectedCategoryId: e.target.options[e.target.selectedIndex].getAttribute('data-categoryId')});
        break;
      case "product":
        this.setState({selectedProductValue: value, selectedProductId: e.target.options[e.target.selectedIndex].getAttribute('data-categoryId')});
        break;
      case "date":
        this.setState({date: value});
        break;
    }
  }

  validateAndSave()
  {
    let name = this.state.name;
    let state = this.state;
    let error = '';
    //check name
    if(name === '')
      error += "Name is required!";
    else if(name.length !== 3)
      error += "Name should consist of 3 letters & special characters are not allowed.";
    else{
      if(name[0].toLowerCase() < 'a' || name[0].toLowerCase() > 'z' && name[1].toLowerCase() < 'a' && name[1].toLowerCase() > 'z' && name[2].toLowerCase() < 'a' && name[2].toLowerCase() > 'z')
        error += "Only letters are allowed in name.";
    }
    //check age
    if(state.age === 0)
    {
      error += "<br />Age is required!";
    }
    else if (state.age < 1 || state.age > 100)
    {
      error += "<br />Age should be between 1 & 100";
    }
    //check phno
    if(state.age <18 && !state.phno.match(/^\d{10}$/))
      {
        error += "<br />Phone number should be of 10 digits";
      }
    else if(state.age <18 && state.phno.length === 0)
    {
      error += "<br />Phone number required!";
    }
    //check Category
    if(state.selectedCategoryValue === '')
    {
      error += "<br />Category is required!";
    }
    if(state.selectedProductValue === '')
    {
      error += "<br />Product is required!";
    }
    if(state.selectedCategoryId && state.selectedProductId && state.selectedCategoryId !== state.selectedProductId)
    {
      error += "<br />Please select a product of the above selected category!";
    }
    //check Date
    if(new Date(state.date).setHours(0,0,0,0) > new Date().setHours(0,0,0,0))
    {
      error += "<br />Date cannot be a future date!";
    }

		this.setState({message: error});
    if((error === '' && sessionStorage.getItem("from2") == "true") || (error === '' && sessionStorage.getItem("from1") == "true"))
    {
			sessionStorage.setItem("from1", false);
			sessionStorage.setItem("from2", false);

      for(let item in state)
      {
        	sessionStorage.setItem(item, state[item]);
      }
			sessionStorage.setItem("categories", JSON.stringify(this.props.categories));
			sessionStorage.setItem("products", JSON.stringify(this.props.products));

			window.location = '/page2';
    }
  }

  componentDidMount()
  {

		this.props.getDataProp();
		this.setState({date: sessionStorage.getItem("date")?sessionStorage.getItem("date"):this.props.date},
		() => {
			if(sessionStorage.getItem("initial") == "false"  )
			{
				sessionStorage.setItem("from2", false);
				this.validateAndSave();

			}
			else
			{
				sessionStorage.setItem("initial", false);
			}
		});
  }

	render()
	{
  let state= this.state;
  let categories = [];
  categories.push(<option key="@" value="">select</option>);
  categories.push.apply(categories, this.props.categories?this.props.categories.map((category) => <option key={category.id} data-categoryId={category.id} value={category.value}>{category.value}</option>):['']);

  let products = [];
  products.push(<option key="!" value="">select</option>);
  products.push.apply(products, this.props.products?this.props.products.map((product) => <option key={product.id} data-categoryId={product.categoryId} value={product.value}>{product.value}</option>):['']);

	return  (
		<div style={styles.container}>
		<form onSubmit={ (e) => {e.preventDefault();} } style={styles.form}>
			Name
      <input type="text" value={this.state.name} name="name" onChange={(e) => this.setValue(e)} style={styles.input} />
			Age
      <input style={styles.input} type="number" value={this.state.age} name="age" onChange={(e) => this.setValue(e)} style={styles.input} />
			{this.state.age<18? <span>Phone number <input type="number" value={this.state.phno} name="phno" onChange={(e) => this.setValue(e)} style={styles.input} /></span>:""}
      Category
      <select name="category" onChange={(e) => this.setValue(e)} value={this.state.selectedCategoryValue} style={styles.input} >
        {categories}
      </select>
      Products
      <select name="product" onChange={(e) => this.setValue(e)} value={this.state.selectedProductValue} style={styles.input} >
        {products}
      </select>
      Instance Date
      <input style={styles.input} type="date" value={this.state.date} name="date" onChange={(e) => this.setValue(e)} style={styles.input} required/>
			<br />
      <button onClick={() => {sessionStorage.setItem("from1", true); this.validateAndSave(); }} style={styles.btn}>Next</button>
    </form>
		<Error style={styles.error}>
			{this.state.message}
		</Error>
		</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getDataProp: () => {
			fetch("http://www.mocky.io/v2/5b6555f53300001000f6a9d3")
     .then( response => {
   		return response.json();
   	}).then( response => {
   		return dispatch({type: "GET_DATA", payload: response});
   	});
		}
	}
}

const mapStateToProps = ({dataReducer}) => {
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

	return {
		categories:dataReducer.categories,
		products:dataReducer.products,
		date: today
	}
}
// export default Form1;
export default Form1 = connect(mapStateToProps, mapDispatchToProps)(Form1);
