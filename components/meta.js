import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
    return (
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'greenpot',
    keywords: 'web development, programming',
    description: 'Framer is a tool built for interactive design. Backed by React, technical users can extend anything through code.',
}

export default Meta;