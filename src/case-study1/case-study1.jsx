import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        const { child, data: {selectedTab} } = this.props.child;
        this.state = {
                selected: selectedTab,
                child: child
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        this.setState({selected:e.target.value})
    }
    render() {
        const { child } = this.state;
        return (
                <div className="sd-csone-parent-container">
                   {child.map((key,i) => {
                       const { name } = this.props.child[key].data;
                       const id = `tab-radio-${i}`;
                       return <TabRadio data={this.props.child[key].data} key={i}
                           id={id} checked={this.state.selected === name} updateStateProp={this.updateState} />;
                   })}
                   
                   {this.state.selected === 'Private'
                       ? <Materializer data={this.props.child.privateOpt.data} />
                       : null
                   }
                   
                </div>
        );
   }
};

class TabRadio extends React.Component {
    render() {
        const { data: { info, name }, checked, updateStateProp, id, className='' }
            = this.props;
        console.log(className);
        return(
           <div>
              <input type="radio" value={name} checked={checked} 
                id={id} onClick={updateStateProp} 
                className={className}/>
              <label htmlFor={id} className={className}>
                <div>{name}</div>
                {info ? <div>{info}</div> : null }
              </label>
           </div>
        );
    }
};

class Materializer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                selected: "Credit Card"
        };
        this.updateState = this.updateState.bind(this);
    }
    updateState(e) {
        this.setState({selected:e.target.value})
    }
    render() {
        const { children: { data, child } } = this.props.data;
        return (
            <div>
                <h2>{data.header}</h2>
                <p>{data.subheader}</p>
                <form>
                    <fieldset>
                        <legend>{data.optHeader}</legend>
                        {child.map((item, i)=> {
                            const { name, options, countryList } = this.props.data.children[item].data;
                            const id = `payment-options-${i}`;
                            return (
                                    <div className="side-by-side">
                                        <TabRadio data={this.props.data.children[item].data} key={i}
                                            id={id} checked={this.state.selected === name} updateStateProp={this.updateState}
                                            className = "d-ib"
                                        />
                                        {this.state.selected === name 
                                            ? <FormElements data = {options} parent = {this.props.data.children[item].data} />
                                            : null
                                        }
                                    </div>);
                        })}
                    </fieldset>
                </form>
            </div>
        );
    }
}

class FormElements extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const renderOptions = (opt, i) =>{
            const { label, name, type, list='' } = opt;
            let renderMarkup = '';
            switch(type) {
                case 'text': 
                    renderMarkup = <div>{label}:<input type="text" name={name} /></div>;
                    break;
                case 'expiry':
                    renderMarkup = <div>
                        {label}:
                        <input type="date" name={name} />
                    </div>;
                    break;
                case 'select': 
                    renderMarkup= <div>
                        {label}:
                        <select name={name}>
                            {this.props.parent[list].map(item => <option value={item}>{item}</option>)}
                        </select>
                    </div>;
                    break;
            }
            
            return renderMarkup;
        };
        return (<div>
                {this.props.data && this.props.data.map((data, i) => renderOptions(data, i))}        
        </div>);
    }
}


export default App;