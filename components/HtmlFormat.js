const HtmlFormat = ({ data }) => {
  function createMarkup() {
    return { __html: data };
  }
  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default HtmlFormat;
