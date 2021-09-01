//allows line breaks with return button
marked.setOptions({
  breaks: true,
});

//inserts target="_blank" into href tags
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + "</a>";
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value,
    });
  }
  handleEditorMaximize() {
    this.setState({
      editorMaximized: !this.state.editorMaximized,
    });
  }
  handlePreviewMaximize() {
    this.setState({
      previewMaximized: !this.state.previewMaximized,
    });
  }

  render() {
    const classes = this.state.editorMaximized
      ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"]
      : this.state.previewMaximized
      ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"]
      : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];

    return (
      <div>
        <div className={classes[0]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handleEditorMaximize}
            text="Enter Markdown"
          />
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className="converter" />
        <div className={classes[1]}>
          <Toolbar
            icon={classes[2]}
            onClick={this.handlePreviewMaximize}
            text="Result"
          />
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i className="fa fa-github" title="GoogolDKhan" />
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      type="text"
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
      id="preview"
    />
  );
};

const placeholder = `
# Welcome to Sarfaraz's React Markdown Previewer!

## So let's get started
### I am gonna show you some really cool stuff:

Here is some code, \`<p>I love coding</p>\`, between 2 backticks.

\`\`\`
// Here is a JavaScript multiline code:

function addNumbers(num1, num2) {
  return num1 + num2;
}
\`\`\`

You can also make text bold **Sarfaraz**... whoa!
Or italic _Sarfaraz_.
Or... why not both?... **_Sarfaraz!_**
And feel free to strike ~~Sarfaraz~~.

[Click here](https://github.com/GoogolDKhan) to get to my github profile
I can add block quote too
> Keep Coding!

How about tables:

Heading 1 | Heading 2 | Heading 3
------------ | ------------- | -------------
Content 1 | Content 2 | Content 3
Content 4 | Content 5 | Content 6

Unordered list:
- Item 1
  - Item 1.1
     - Item 1.1.1
- Item 2

Ordered list:
1. Item 1
1. Item 2
1. Item 3

And ofcourse Images:

![Profie Pic](https://i.ibb.co/519RzY5/Profile-Toon.jpg)
`;

ReactDOM.render(<App />, document.getElementById("app"));
