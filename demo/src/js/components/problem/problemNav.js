import React from 'react';

class ProblemNav extends React.Component {
  constructor(props) {
    super(props);
  };

  render (){
    const { OjType } = this.props;
    return(
      <div className="problem-nav">
        <select>
          <option value="0" selected={OjType == "hdoj"}>HDOJ</option>
          <option value="1" selected={OjType == "zoj"}>ZOJ</option>
          <option value="2" selected={OjType == "poj"}>POJ</option>
          <option value="3" selected={OjType == "toj"}>TOJ</option>
        </select>
        <input type="text" name="name" value="" placeholder="请输入想要的题号" />
        <button type="button" name="button">提交</button>
      </div>
    )
  }
}

export default ProblemNav;
