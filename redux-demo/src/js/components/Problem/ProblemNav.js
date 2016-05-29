import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from './ProblemNavRedux';
import { OJList } from '../../config/config';

import { Select, Input, Button, Pagination } from 'antd';
import classNames from 'classnames';

const Option = Select.Option;
const InputGroup = Input.Group;

@connect(state => {
  return {
    ...state.problems.problemNav
  };
}, {
  ...actions
})

class ProblemNav extends Component {
  static propTypes = {
    OJId: PropTypes.number.isRequired,
    searchPid: PropTypes.string,
    selectOJ: PropTypes.func.isRequired,
    onSearchPid: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      pidValue: this.props.searchPid || '',
      focus: false,
    };
  };

  // actions
  selectOJ(value) {
    this.props.selectOJ(value);
  }

  handleSearch() {
    this.props.onSearchPid(this.state.pidValue);
  }

  // component state
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  }

  handleInputChange(e) {
    this.setState({
      pidValue: e.target.value,
    });
  }

  render (){
    const { OJId } = this.props;
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.pidValue.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    return(
      <div className="problem-nav">
        <Select defaultValue="HDOJ" style={{ width: 120 }}
          onChange={::this.selectOJ}>
          { OJList.map((option, i) =>
            <Option value={option.OJId} key={i}>
              {option.OJName}
            </Option>)
          }
        </Select>
        <div className="ant-search-input-wrapper" style={{ width: 200 }}>
          <InputGroup className={searchCls}>
            <Input placeholder="请输入想要的题号"
              value={this.state.pidValue}
              onChange={::this.handleInputChange}
              onFocus={::this.handleFocusBlur}
              onPressEnter={::this.handleSearch} />
              <div className="ant-input-group-wrap">
                <Button icon="search"
                  className={btnCls}
                  onClick={::this.handleSearch} />
              </div>
          </InputGroup>
        </div>
      </div>
    )
  }
}

export default ProblemNav;
