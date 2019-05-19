import React from 'react';
import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './tooltip-view.scss';
// https://react-bootstrap.netlify.com/components/alerts/
const TooltipView = ({ placement, tooltipText, children }) => {
  return (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip className="bs-tooltip-custom" id={`tooltip-${placement}`}>
          {tooltipText}
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );
};

TooltipView.propTypes = {
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']).isRequired,
  children: PropTypes.any.isRequired
};

export default TooltipView;
