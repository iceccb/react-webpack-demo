export default class ParentComponent extends React.Component {
  render() {
    return (
      <ul>
      {
        this.props.children
      }
      </ul>
    )
  }
};

