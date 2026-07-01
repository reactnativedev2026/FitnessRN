import React from 'react';
import CommonEmptyState from './common/CommonEmptyState';

type EmptyListMessageProps = {
  message?: string;
  icon?: string;
};

const EmptyListMessage = ({
  message = 'No deliveries found at the moment.',
  icon = 'cube-outline',
}: EmptyListMessageProps) => (
  <CommonEmptyState
    message={message}
    description="When you have new tasks, they will appear here."
    icon={icon}
  />
);

export default EmptyListMessage;
