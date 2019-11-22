import React from 'react';
import ReactDOM from 'react-dom';

import { Card } from 'react-bootstrap';

export default function PhotoCard({photo}) {
  return (
    <Card className="col-4">
      <Card.Img src={photo.data} />
      <Card.Text>
        {photo.desc}
      </Card.Text>
    </Card>
  );
}