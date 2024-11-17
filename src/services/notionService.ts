import { console } from 'inspector';
import { notion, databaseId } from '../config/notionConfig';
import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const isPageObjectResponse = (
  record: QueryDatabaseResponse["results"][number]
): record is PageObjectResponse => {
  return "id" in record;
};


// Listar registros
export const listRecords = async () => {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results;
};

const findRecordByNumber = async (number: number) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'ID',
      number: {
        equals: number,
      },
    },
  });

  if (response.results.length === 0) {
    throw new Error(`Registro com ID ${number} não encontrado.`);
  }

  return response.results[0].id; // Retorna o UUID da página encontrada
};

// Criar registro
export const createRecord = async (properties: any) => {
  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      ID: {
        type: "number",
        number: properties.ID, // Passa o número diretamente
      },
      Company: {
        title: [
          {
            text: {
              content: properties.Company || "Default Company Name", // Nome da empresa
            },
          },
        ],
      },
      Content: {
        rich_text: [
          {
            text: {
              content: properties.Content || "Default Content", // Conteúdo
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: properties.Description || "Default Description", // Descrição
            },
          },
        ],
      },
      PlannedDate: {
        date: {
          start: properties.PlannedDate || new Date().toISOString(), // Data planejada
        },
      },
    },
  });

  return response;
};

// Buscar registro por ID
export const getRecordById = async (id: string) => {
  const response = await notion.pages.retrieve({ page_id: id });
  return response;
};

// Atualizar registro
export const updateRecord = async (number: number, properties: any) => {
  try {
    const recordId = await findRecordByNumber(number);
    console.log(number);
    // Atualiza o registro com base no UUID encontrado
    const response = await notion.pages.update({
      page_id: recordId,
      properties: properties,
    });

    return response; // Retorna a resposta da API
  } catch (error) {
    console.error(`Erro ao atualizar registro com ID ${number}`, error);
    throw error; // Propaga o erro
  }
};

// Excluir (arquivar) registro pelo número no campo ID
export const deleteRecord = async (number: number) => {
  try {
    const pageId = await findRecordByNumber(number); // Busca o UUID pelo número do ID
    const response = await notion.pages.update({
      page_id: pageId,
      archived: true,
    });

    return response;
  } catch (error) {
    console.error(`Erro ao excluir registro com ID ${number}`);
    throw error;
  }
};

export const searchRecordByNumberService = async (number: number) => {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "ID",
      number: {
        equals: number,
      },
    },
  });

  if (response.results.length === 0) {
    throw new Error(`Record with ID number ${number} not found.`);
  }

  // Filtrar para encontrar um registro válido
  const record = response.results.find(isPageObjectResponse);

  if (!record) {
    throw new Error(`No valid record found for ID number ${number}.`);
  }

  return record; // Retorna o registro completo
};