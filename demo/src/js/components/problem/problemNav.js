import React from 'react';

class ProblemNav extends React.Component {
  constructor(props) {
    super(props);
  };

  render (){
    const { OjType, OJList, onChange } = this.props;
    return(
      <div className="problem-nav">
        <select value={OjType} onChange={e => onChange(e.target.value)}>
          {OJList.map(option =>
            <option value={option} key={option}>
              {option}
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
