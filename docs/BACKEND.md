# GraphRAG Setup for Enterprise Architecture Documentation

This README explains how to set up and customize GraphRAG for processing and analyzing this application.

## Initial Setup and Deployment

For initial setup and deployment of GraphRAG, please refer to the official documentation:
[Get Started with GraphRAG](https://microsoft.github.io/graphrag/posts/get_started/) or use the quickstart below...

1. Go to the root directory of the project.
2. Create virtual environment
  ```
  python3 -m venv ea_assistant
  ```
3. Activate it
  ```
  source ea_assistant/bin/activate
  ```
4. Install dependencies
  ```
  pip install -r requirements.txt
  ```

Now you're ready to to setup GraphRAG!

## The Setup

We've already preset some configuration for you, but you'll need to customize it for your own use case.

### Prompts

Based on the types of documentation EA usually manages, we've customized the graphrag prompts to better suit enterprise architecture documentation.  You can find the custom prompts in the `index/prompts` directory.  You can also find the original prompts:

1. [Entity/Relationship Extraction](EXTRACTION.md)
2. [Summarize Entity/Relationship Descriptions](SUMMARIZE.md)
3. [Claim Extraction](CLAIMS.md)
4. [Generate Community Reports](COMMUNITY_REPORT.md)

### Customizing Configuration

For just testing out, there shouldn't be much you need to change.

### YAML Configuration (settings.yaml)

You'll want to customize the [/index/settings.yaml](/index/settings.yaml) by adjusting the LLM settings. Unless you find the need to customize the ontology, entities, etc... this should be it to get running locally, although you may need to adjust threading and other settings based on your system.  Key sections to focus on:

- llm
- embeddings

For more on the configuration see [https://microsoft.github.io/graphrag/posts/config/overview/](https://microsoft.github.io/graphrag/posts/config/overview/)

> NOTE: The default configuration should work out of the box if using OpenAI directly, if using Azure OpenAI, you'll definitely need to make some updates.

### Environment Variables

Using either .env file or `export...` in your terminal, you can set environment variables for the following:

- GRAPHRAG_API_KEY: The OpenAI or Azure OpenAI API key

To set, run the following command:

```
export GRAPHRAG_API_KEY=<your_api_key>
```

or 

```
echo "GRAPHRAG_API_KEY=<your_api_key>" >>.env
```

> NOTE: The graphrag init precreates the .env file usually in the root directory (e.g. `index`), but you'll need to create it for this project.

### Indexing and Querying

GraphRAG takes care of a lot of the heavy lifting and we've done our best to make this as simple as possible to use out of the box.

## Loading your documents

All you need to do is drop your documents into the `index/staging` directory.  The documents should be in the following format:

- txt
- ppt(x)
- pdf
- doc(x)
- xls(x)

> NOTE: By default GraphRAG only supports txt/csv files.  We've added a custom preprocessor to convert the other types of documents to txt.  We should of done using a custom workflow, but this is a PoC :)

## Running the indexer

As always, we recommend to [RTFM](https://microsoft.github.io/graphrag/) first, but here are the basics:


1. Run our converter (other doc types to txt).
  ```
  python index/scripts/document_converter.py
  ```
2. Index the documents.
  ```
  python -m graphrag.index --root index
  ```

> COMING SOON: Do through the UI!

## Testing the index

You can test the index using GraphRags [CLI](https://microsoft.github.io/graphrag/posts/index/2-cli/).  There are two options for querying - Global (more general questions) and Local (more specific questions).

1. Testing global queries
  ```
  python -m graphrag.query \
  --root ./index \
  --method global \
  "<general question based on your docs (e.g. What does Enterprise Architecture do?)>"
  ```
2. Testing local queries
```
python -m graphrag.query \
--root ./index \
--method local \
"<specific question based on your docs (e.g. What are our guiding principles?)>"
```

