import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from './ProblemNavRedux';
import { OJList } from '../../config/config';

@connect(state => {
  return {
    ...state.problem.problemNav
  };
}, {
  ...actions
})

class ProblemNav extends Component {
  static propTypes = {
    selectOJId: PropTypes.number.isRequired,
    ojChange: PropTypes.func.isRequired
  };

  render (){
    const { selectOJId } = this.props;
    return(
      <div className="problem-nav">
        <select value={selectOJId} onChange={e => this.ojChange(e.target.value)}>
          { ojList.map((option, i) =>
            <option value={option.ojId} key={option.ojId}>
              {option.ojName}
            </option>)
          }
        </select>
        <input type="text" name="name" value="" placeholder="请输入想要的题号" />
        <button type="button" name="button">提交</button>
      </div>
    )
  }
}

export default ProblemNav;
