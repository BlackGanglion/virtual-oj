import React from 'react';

class ProblemList extends React.Component {
  constructor(props) {
    super(props);
  };

  render (){
    const { OJList } = this.props;
    return(
      <div className="problem-list">
        <table>
           <thead>
             <tr>
               <td>OJ</td>
               <td>Prob ID</td>
               <td>Title</td>
               <td>Update Time</td>
               <td>Source</td>
             </tr>
           </thead>
           <tbody>
             {this.props.posts.map((post, i) =>
               <tr key={i}>
                 <td>{OJList[post.ojid]}</td>
                 <td>{post.problemId}</td>
                 <td>{post.title}</td>
                 <td>{new Date(post.updateTime).toLocaleTimeString()}</td>
                 <td>{post.source}</td>
               </tr>
             )}
           </tbody>
        </table>
      </div>
    );
  }
}

export default ProblemList;
