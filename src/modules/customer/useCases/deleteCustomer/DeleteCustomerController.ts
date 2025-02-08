import { container } from 'tsyringe';
import { DeleteCustomerUseCase } from './DeleteCustomerUseCase';
import { Request, Response } from "express";

class DeleteCustomerController {
    async handle(request: Request, response: Response): Promise<void> {
        const {id} = request.params

        try {
            const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase)
            await deleteCustomerUseCase.execute(id)

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

export default DeleteCustomerController