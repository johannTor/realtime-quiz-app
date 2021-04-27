import React from 'react'

export default function InvalidRoom() {
  return (
    <div className="pagePanels">
      <div className="leftSidebar">
        <div className="logo">
          InstaQuiz
        </div>
      </div>
      <div className="theQuiz">
        <h3>This room does not exist</h3>
      </div>
      <div className="userList"></div>
    </div>
  )
}
