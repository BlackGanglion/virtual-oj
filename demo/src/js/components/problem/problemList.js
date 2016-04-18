import React from 'react';

class ProblemList extends React.Component {
  render (){
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
             <tr>
               <td>HDOJ</td>
               <td>1001</td>
               <td>A + B</td>
               <td>24343</td>
               <td>ACM题级</td>
             </tr>
           </tbody>
        </table>
      </div>
    );
  }
}

export default ProblemList;
