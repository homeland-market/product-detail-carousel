const React = require('react');
const style = require('styled-components').default;
const Container = require('../lib/container.jsx');
const Heading = require('../lib/heading.jsx');

const HeadingDescription = style(Heading)`
  display: -webkit-box;
  height: 2.4em;
  margin-top: 8px;`;

const Description = ({ product }) => (
  <Container>
    <HeadingDescription>{product.description}</HeadingDescription>
  </Container>
);

module.exports = Description;
