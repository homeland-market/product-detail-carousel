const React = require('react');
const style = require('styled-components').default;
const { css } = require('styled-components');
const Container = require('../lib/container.jsx');
const Button = require('./button.jsx');
const Card = require('../product-card/index.jsx');

const left = ({ position }) => css`left: ${position || 0}px;`;

const OuterContainer = style(Container)`
  position: relative;
  overflow: hidden;`;

const InnerContainer = style(Container)`
  padding: 12px 4px;
  overflow: hidden;`;

const UL = style.ul`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  transition-duration: .25s;
  transition-timing-function: cubic-bezier(.65,.05,.36,1);
  transition-property: background-color,transform,color,border-color,margin,left;
  ${left}`;

const LI = style.li`
  position: relative;
  display: list-item;
  flex: 0 0 40%;
  max-width: 220px;
  min-width: 172px;
  margin: 0 8px 0 0;
  padding: 0;
  background: #fff;
  border-radius: 8px;`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      cardWidth: 0,
      totalWidth: 0,
      containerWidth: 0,
      hideLeft: true,
      hideRight: false,
    };
    this.productList = React.createRef();
    this.moveSlides = this.moveSlides.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidUpdate() {
    this.updateDimensions();
  }

  updateDimensions() {
    const list = this.productList.current;
    const { cardWidth } = this.state;
    if (cardWidth > 0 || list === null) {
      return;
    }
    if (list.childNodes.length > 0) {
      const containerWidth = list.offsetWidth;
      const newCardWidth = list.firstChild.offsetWidth + 8;
      const totalWidth = list.childNodes.length * newCardWidth;
      this.setState(() => (
        { cardWidth: newCardWidth, totalWidth, containerWidth }
      ));
    }
  }

  moveSlides(direction) {
    this.setState((prevState, props) => {
      const { position, cardWidth, totalWidth, containerWidth } = prevState;
      let newPosition = 0;
      let hideLeft = true;
      let hideRight = true;
      if (direction === 'next') {
        newPosition = position - cardWidth;
      }
      if (direction === 'previous') {
        newPosition = position + cardWidth;
      }
      if (newPosition < 0) {
        hideLeft = false;
      }
      if (((totalWidth - containerWidth) + newPosition) > 0) {
        hideRight = false;
      }
      return { position: newPosition, hideLeft, hideRight };
    });
  }

  nextSlide() {
    this.moveSlides('next');
  }

  previousSlide() {
    this.moveSlides('previous');
  }

  render() {
    const { products } = this.props;
    const { position, hideLeft, hideRight } = this.state;
    return (
      <OuterContainer>
        <Button side="left" title="Previous Slide" click={this.previousSlide} hide={hideLeft} />
        <InnerContainer>
          <UL position={position} ref={this.productList}>
            {products.map((product) => (
              <LI key={product._id}>
                <Card product={product} />
              </LI>
            ))}
          </UL>
        </InnerContainer>
        <Button side="right" title="Next Slide" click={this.nextSlide} hide={hideRight} />
      </OuterContainer>
    );
  }
}

module.exports = Carousel;
