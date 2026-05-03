// TODO: Implémenter sections StoryBrand complètes

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl font-bold text-[#1D9E75] mb-4">AfroVerse</h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-8">
          Découvrez votre profil capillaire unique. Recommandations produits
          personnalisées pour cheveux 3A à 4C.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'}
          className="bg-[#1D9E75] hover:bg-[#17886400] text-white font-semibold py-3 px-8 rounded-full transition-colors"
        >
          Démarrer mon diagnostic gratuit
        </a>
      </section>

      {/* Comment ça marche */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '1', title: 'Diagnostic', desc: 'Réponds à 5 questions sur ta chevelure' },
            { step: '2', title: 'Profil', desc: 'Reçois ton profil capillaire détaillé' },
            { step: '3', title: 'Recommandations', desc: 'Découvres les produits adaptés à tes cheveux' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="bg-white/5 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#534AB7] mb-3">{step}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center bg-[#1D9E75]/10">
        <h2 className="text-3xl font-bold mb-4">Prête à transformer ta routine ?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Rejoins des milliers de femmes qui ont découvert les produits parfaits pour leurs cheveux.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'}
          className="bg-[#534AB7] hover:bg-[#4338ca] text-white font-semibold py-3 px-8 rounded-full transition-colors"
        >
          Commencer maintenant — c&apos;est gratuit
        </a>
      </section>

      {/* TODO: Ajouter section témoignages */}
      {/* TODO: Ajouter section partenaires B2B */}
      {/* TODO: Ajouter footer */}
    </main>
  )
}

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>apps/docs/app/page.tsx</code>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new/clone?demo-description=Learn+to+implement+a+monorepo+with+a+two+Next.js+sites+that+has+installed+three+local+packages.&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4K8ZISWAzJ8X1504ca0zmC%2F0b21a1c6246add355e55816278ef54bc%2FBasic.png&demo-title=Monorepo+with+Turborepo&demo-url=https%3A%2F%2Fexamples-basic-web.vercel.sh%2F&from=templates&project-name=Monorepo+with+Turborepo&repository-name=monorepo-turborepo&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fturborepo%2Ftree%2Fmain%2Fexamples%2Fbasic&root-directory=apps%2Fdocs&skippable-integrations=1&teamSlug=vercel&utm_source=create-turbo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://turborepo.dev/docs?utm_source"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
        <Button appName="docs" className={styles.secondary}>
          Open alert
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com/templates?search=turborepo&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://turborepo.dev?utm_source=create-turbo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to turborepo.dev →
        </a>
      </footer>
    </div>
  );
}
