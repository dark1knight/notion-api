import { Request, Response } from 'express';
import { listRecords, createRecord, getRecordById, updateRecord, deleteRecord, searchRecordByNumberService } from '../services/notionService';

export const listRecordsController = async (_req: Request, res: Response) => {
  try {
    const records = await listRecords();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Error listing records' });
  }
};

export const createRecordController = async (req: Request, res: Response) => {
  try {
    const properties = req.body;
    const record = await createRecord(properties);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error creating record' });
  }
};

export const getRecordController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await getRecordById(id);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving record' });
  }
};

export const updateRecordController = async (req: Request, res: Response) => {
  try {
    const { id: number } = req.params; // Aqui 'id' é o número no campo ID
    const properties = req.body.properties;
    console.log(number)
    const record = await updateRecord(Number(number), properties);
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error updating record' });
  }
};

export const deleteRecordController = async (req: Request, res: Response) => {
  try {
    const { id: number } = req.params;
    const record = await deleteRecord(Number(number));
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting record' });
  }
};

export const searchRecordByNumber = async (req: Request, res: Response) => {
  try {
      const data = await searchRecordByNumberService(parseInt(req.params.number, 10));
      res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: 'Error getting record by number' });
  }
};