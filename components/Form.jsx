import Link from "next/link";

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
  }) => {
    //adding a sanitization to the input
    const sanitizeInput = (input) => {
      if (input === null || input === undefined) {
        return '';
      }
      
      const sanitizedInput = input
        .toString()
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
      return sanitizedInput;
    }

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">
        {type} Post
      </h1>

      {
        // In the future I would like to have the text as Resx keys to accept translations
      }
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world. Let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={ handleSubmit }
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          {
            //This will update the prompt value of the post
          }
          <textarea 
            value={post.prompt}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setPost({
                ...post,
                prompt: sanitizedValue,
              });
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          >

          </textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag 
            <span 
              className="font-normal ml-2"
            >
              (#product, #webdevelopment, #idea)
            </span>
          </span>

          {
            //This will update the prompt value of the post
          }
          <input 
            value={post.tag}
            onChange={(e) => {
              const sanitizedValue = sanitizeInput(e.target.value);
              setPost({
                ...post,
                tag: sanitizedValue,
              });
            }}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;