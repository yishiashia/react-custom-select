import React from 'react';
import ReactDOM from 'react-dom';

export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props);

    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.focus = this.focus.bind(this)
    this.blur = this.blur.bind(this)
    this.handleKeyup = this.handleKeyup.bind(this)

    this.closeAllSelect = this.closeAllSelect.bind(this);
    this.expandMenu = this.expandMenu.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    var default_value = (Array.isArray(props.options) && props.options.length > 0) ? props.options[0].value : ""
    default_value = default_value === undefined ? "" : default_value
    var default_name = (Array.isArray(props.options) && props.options.length > 0) ? props.options[0].name : ""
    default_name = default_name === undefined ? "" : default_name
    var default_option = Array.isArray(props.options)? props.options : []
    this.state = {
      expand: false,
      focus: false,
      cursor: 0,
      options: default_option,
      option_value: default_value,
      option_name: default_name,
      span: <span className="custom-select" aria-hidden="true"><span><span></span></span></span>
    };
  }

  mouseEnter() {
    this.setState({
      focus: true
    })
  }

  mouseLeave() {
    if(document.activeElement === ReactDOM.findDOMNode(this.refs.selectInput)) {
      this.setState({
        focus: true
      })
    } else {
      this.setState({
        focus: false
      })
    }
  }

  focus(e) {
    this.setState({
      focus: true
    })
  }

  blur() {
    this.setState({
      focus: false
    })
  }

  handleKeyup(e) {
    e.preventDefault()
    if(e.key == " " || e.key == "Enter") {
      if(!this.state.expand) {
        this.setState({
          expand: true
        })
      } else {
        this.setState({
          expand: false,
          option_value: this.props.options[this.state.cursor].value,
          option_name: this.props.options[this.state.cursor].name
        })
      }
    } else if(e.key == "ArrowDown") {
      if(!this.state.expand) {
        this.setState({
          expand: true
        })
      } else {
        this.setState({
          cursor: (this.state.cursor + 1) % this.props.options.length
        })
      }
    } else if(e.key == "ArrowUp") {
      if(!this.state.expand) {
        this.setState({
          expand: true
        })
      } else {
        this.setState({
          cursor: (this.props.options.length + this.state.cursor - 1) % this.props.options.length
        })
      }
    } else if(["Escape", "Tab"].includes(e.key)) {
      this.setState({
        expand: false
      })
    }
  }

  closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  expandMenu(e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    //this.closeAllSelect(e.target);
    //this.classList.toggle("select-arrow-active");
    this.setState({
      expand: !this.state.expand
    })
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        expand: false,
        focus: false
      })
    }
  }

  chooseOption(name, value) {
    this.setState({
      expand: false,
      option_value: value,
      option_name: name
    })
  }

  render() {
    return (
      <div className="measure" style={{position: "relative"}}>
        <input type="text"
               className="custom replaced"
               name={this.props.name}
               value={this.state.option_value}
               onClick={this.expandMenu}
               onFocus={this.focus}
               onMouseEnter={this.mouseEnter}
               onMouseLeave={this.mouseLeave}
               onKeyUp={this.handleKeyup}
               ref="selectInput"
        />
        <div className={"custom-select" + (this.state.expand ? " shadow-sm" : "") + (this.state.focus ? " focus" : "")}>
          <div className={"select-selected form-control" + (this.state.expand ? " select-arrow-active" : "")}
               onClick={this.expandMenu}
               style={{width: "100%"}}
          >
            {this.state.option_name}
          </div>
          <div className={"shadow-sm select-items" + (this.state.expand ? "" : " select-hide")}>
            {
              this.state.options.map((item, index) => (
                <div className={(this.state.option_value == item.value || index == this.state.cursor) ? "same-as-selected" : ""}
                     onClick={this.chooseOption.bind(this, item.name, item.value)}
                >
                  {item.name}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}
