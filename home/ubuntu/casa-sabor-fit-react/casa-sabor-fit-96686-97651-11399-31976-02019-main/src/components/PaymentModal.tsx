import { X, CreditCard, Smartphone, Barcode } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeName: string;
  price: number;
  onSuccess: () => void;
}

type PaymentMethod = "pix" | "card" | "boleto";

export const PaymentModal = ({ isOpen, onClose, recipeName, price, onSuccess }: PaymentModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("pix");
  const [coupon, setCoupon] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      onClose();
      toast.success("Pagamento realizado com sucesso! Receita desbloqueada 🎉");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl max-w-md w-full shadow-premium animate-scale-in">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-2xl">Finalizar Compra</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Resumo do Produto */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">{recipeName}</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">R$ {price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">pagamento único</span>
            </div>
          </div>

          {/* Métodos de Pagamento */}
          <div>
            <p className="text-sm font-medium mb-3">Método de Pagamento</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedMethod("pix")}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === "pix"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs font-medium">PIX</span>
              </button>
              <button
                onClick={() => setSelectedMethod("card")}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === "card"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs font-medium">Cartão</span>
              </button>
              <button
                onClick={() => setSelectedMethod("boleto")}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === "boleto"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Barcode className="w-6 h-6" />
                <span className="text-xs font-medium">Boleto</span>
              </button>
            </div>
          </div>

          {/* Cupom de Desconto */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Cupom de Desconto (opcional)
            </label>
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Digite o cupom"
              className="bg-background"
            />
          </div>

          {/* Informação do método selecionado */}
          <div className="bg-accent/20 rounded-lg p-4 text-sm">
            {selectedMethod === "pix" && (
              <p className="text-accent">
                ✓ Pagamento instantâneo via PIX. Você receberá o QR Code após confirmar.
              </p>
            )}
            {selectedMethod === "card" && (
              <p className="text-accent">
                ✓ Cartões de crédito e débito aceitos. Processamento seguro.
              </p>
            )}
            {selectedMethod === "boleto" && (
              <p className="text-accent">
                ✓ Boleto bancário com vencimento em 3 dias úteis.
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1 gradient-primary border-0"
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Finalizar Compra"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
