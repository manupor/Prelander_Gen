# 🚀 Comandos para Setup de Supabase Edge Functions

## Tu Project ID: `nfinuiiqqjzejmczfiek`

---

## 📋 Ejecuta estos comandos en orden:

### 1. Login (ya en progreso)
```bash
npx supabase login
```
**Presiona Enter** → Se abrirá navegador → Autoriza → Vuelve a terminal

---

### 2. Link tu proyecto
```bash
npx supabase link --project-ref nfinuiiqqjzejmczfiek
```

Te pedirá la **database password**. La encuentras en:
- Supabase Dashboard → Settings → Database → Database Password
- Si no la recuerdas, puedes resetearla ahí mismo

---

### 3. Crear Edge Function para Welcome Email
```bash
npx supabase functions new send-welcome-email
```

Esto creará: `supabase/functions/send-welcome-email/index.ts`

---

### 4. Obtener tu Resend API Key

Si no tienes cuenta en Resend:
1. Ve a: https://resend.com/signup
2. Crea cuenta (gratis hasta 3000 emails/mes)
3. Ve a: API Keys → Create API Key
4. Copia la key

---

### 5. Deploy la función
```bash
npx supabase functions deploy send-welcome-email --no-verify-jwt
```

---

### 6. Set el secret de Resend
```bash
npx supabase secrets set RESEND_API_KEY=re_tu_api_key_aqui
```

---

### 7. Crear Database Webhook

Ve a Supabase Dashboard → Database → Webhooks → Create Webhook

**Configuración:**
```
Name: send-welcome-email
Table: auth.users
Events: ☑ UPDATE (solo marca este)
HTTP Request:
  Method: POST
  URL: https://nfinuiiqqjzejmczfiek.supabase.co/functions/v1/send-welcome-email
  Headers:
    Authorization: Bearer [TU-ANON-KEY]
```

**Para obtener tu ANON-KEY:**
- Dashboard → Settings → API → Project API keys → `anon` `public`

---

## ✅ Checklist de progreso:

- [ ] Login completado
- [ ] Proyecto linkeado
- [ ] Edge function creada
- [ ] Código de función configurado
- [ ] Función deployeada
- [ ] Secret de Resend configurado
- [ ] Webhook creado en Dashboard

---

## 🐛 Troubleshooting

**Si link falla:**
- Verifica que copiaste bien el Project ID
- Asegúrate de tener la database password correcta

**Si deploy falla:**
- Verifica que el código no tenga errores de sintaxis
- Asegúrate de estar en el directorio correcto del proyecto

**Si webhook no dispara:**
- Verifica que la URL sea correcta
- Verifica que el header Authorization tenga el ANON key correcto
- Revisa los logs en Dashboard → Edge Functions → Logs
