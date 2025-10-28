# 🔗 Configuración del Webhook - Copia estos valores exactos

## 📍 URL para crear el webhook:
```
https://supabase.com/dashboard/project/nfinuiiqqjzejmczfiek/database/webhooks
```

---

## ⚙️ Configuración del Webhook (Copia estos valores):

### **Hook name:**
```
send-welcome-email
```

### **Schema:**
```
auth
```

### **Table:**
```
users
```

### **Events (marca solo este):**
```
☑ UPDATE
☐ INSERT
☐ DELETE
```

### **Webhook configuration:**

**Type:**
```
HTTP Request
```

**Method:**
```
POST
```

**URL:**
```
https://nfinuiiqqjzejmczfiek.supabase.co/functions/v1/send-welcome-email
```

### **HTTP Headers:**

**Header 1:**
```
Name: Authorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maW51aWlxcWp6ZWptY3pmaWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc1NTYsImV4cCI6MjA3Mzk2MzU1Nn0.w8jPNz7zcUxWRKgwIBc1GvuUNU5oyjodX9bNYdIE4bg
```

**Header 2 (Opcional pero recomendado):**
```
Name: Content-Type
Value: application/json
```

---

## 📸 Paso a Paso Visual:

### **1. Abre el link:**
https://supabase.com/dashboard/project/nfinuiiqqjzejmczfiek/database/webhooks

### **2. Click en "Create a new hook" o "Enable Webhooks"**

### **3. Si te pregunta "Enable Database Webhooks?":**
- Click en "Enable Webhooks"

### **4. Llena el formulario:**

**Section 1 - Basic Info:**
- Hook name: `send-welcome-email`
- Schema: `auth` (selecciona del dropdown)
- Table: `users` (selecciona del dropdown)

**Section 2 - Events:**
- Marca SOLO: `☑ UPDATE`
- Deja desmarcados INSERT y DELETE

**Section 3 - Webhook Configuration:**
- Type: `HTTP Request`
- Method: `POST`
- URL: `https://nfinuiiqqjzejmczfiek.supabase.co/functions/v1/send-welcome-email`

**Section 4 - HTTP Headers:**
- Click en "+ Add header"
- Name: `Authorization`
- Value: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maW51aWlxcWp6ZWptY3pmaWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzODc1NTYsImV4cCI6MjA3Mzk2MzU1Nn0.w8jPNz7zcUxWRKgwIBc1GvuUNU5oyjodX9bNYdIE4bg`

### **5. Click en "Create hook" o "Confirm"**

---

## ✅ Verificar que funciona:

### **Test 1 - Manual:**
1. Ve a: Database → Webhooks
2. Encuentra tu webhook "send-welcome-email"
3. Click en los 3 puntos (...)
4. Click en "Send test event"
5. Deberías ver status 200 OK

### **Test 2 - Real:**
1. Crea una cuenta nueva en tu app
2. Confirma el email (click en el link)
3. En ~30 segundos deberías recibir el email de bienvenida
4. Si no llega, revisa logs en: Functions → send-welcome-email → Logs

---

## 🐛 Troubleshooting:

**Si el webhook no se activa:**
- Verifica que el evento sea UPDATE (no INSERT)
- Verifica que la tabla sea `auth.users` (no `public.users`)

**Si ves error 401:**
- Verifica que copiaste el Bearer token completo
- Asegúrate de que dice "Bearer " (con espacio) antes del token

**Si ves error 404:**
- Verifica que la URL sea exactamente: `https://nfinuiiqqjzejmczfiek.supabase.co/functions/v1/send-welcome-email`

**Si el email no llega:**
- Revisa los logs en: Dashboard → Edge Functions → send-welcome-email → Logs
- Verifica que tu Resend API key sea válida

---

## 📊 Estado Actual:

✅ Supabase CLI instalado y configurado
✅ Proyecto linkeado (nfinuiiqqjzejmczfiek)
✅ Edge Function deployada (send-welcome-email)
✅ Resend API Key configurada
⏳ **FALTA:** Crear webhook en Dashboard (siguiente paso)

---

**Una vez creado el webhook, todo estará funcionando!** 🎉
