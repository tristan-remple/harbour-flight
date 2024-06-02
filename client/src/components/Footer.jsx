import React from 'react';
import '../css/footer.css';

const Footer = props => {
    return (
      <footer className="muted">
        <div className="container">
          <p className="float-right">
            <a href="/#">Back to top</a>
          </p>
          <p>iNaturalist companion app done as NSCC coursework by <a href="https://aqualunae.ca/">Tristan</a>.</p>
          <p>Using album example &copy; Bootstrap.</p>
        </div>
      </footer>
    );
}
 
export default Footer;