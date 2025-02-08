import { container } from 'tsyringe';
import { Request, Response } from "express";
import { DeleteProductUseCase } from './DeleteProductUseCase';

class DeleteProductController {
    async handle(request: Request, response: Response): Promise<void> {
        const {id} = request.params

        try {
            const deleteProductUseCase = container.resolve(DeleteProductUseCase)
            await deleteProductUseCase.execute(id)

            response.status(200).json({ success: true })
        } catch (error) {
            if (error instanceof Error) {
              response.status(400).json({ success: false, message: error.message });
            } else {
              response
                .status(400)
                .json({ success: false, message: "Erro desconhecido" });
            }
          }
    }
}

export default DeleteProductController