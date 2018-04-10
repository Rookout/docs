const Collapsible = props => (
  <div className="wrap-collabsible">
    <input id="collapsible" className="toggle" type="checkbox" />
    <label htmlFor="collapsible" className="lbl-toggle">{props.title}</label>
    <div className="collapsible-content">
      <div className="content-inner">
        {props.children}
      </div>
    </div>
  </div>
);

module.exports = Collapsible;
