const HeroBanner = () => {
  return (
    <section className="px-6 pb-12 pt-10 text-center">
      <h1 className="text-4xl leading-tight text-foreground md:text-[52px] md:leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
        Visualize How AI Reads Your <em>Text</em>
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
        Token Visualizer is a free AI token counter and tokenizer. Paste text, choose a model, and instantly see token counts and estimated API costs.
      </p>
    </section>
  );
};

export default HeroBanner;
