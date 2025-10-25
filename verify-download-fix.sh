#!/bin/bash

# Download System Verification Script
# Verifies that all fixes for game template downloads are in place

echo "🔍 Verifying Download System Fix..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check 1: CastleSlot folder exists
echo "📁 Checking game folders..."
if [ -d "public/CastleSlot" ]; then
    echo -e "${GREEN}✓${NC} CastleSlot folder exists"
    
    # Check for index.html
    if [ -f "public/CastleSlot/index.html" ]; then
        echo -e "${GREEN}✓${NC} CastleSlot/index.html found"
    else
        echo -e "${RED}✗${NC} CastleSlot/index.html MISSING"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}✗${NC} CastleSlot folder MISSING"
    echo -e "${YELLOW}  Fix: cp -r public/fisherman-slot public/CastleSlot${NC}"
    errors=$((errors + 1))
fi

if [ -d "public/FisherMan Slot" ]; then
    echo -e "${GREEN}✓${NC} FisherMan Slot folder exists"
else
    echo -e "${RED}✗${NC} FisherMan Slot folder MISSING"
    errors=$((errors + 1))
fi

echo ""

# Check 2: Download route has correct mappings
echo "🔧 Checking download route configuration..."
if grep -q "t10.*CastleSlot" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} Template t10 mapped to CastleSlot"
else
    echo -e "${RED}✗${NC} Template t10 mapping incorrect"
    errors=$((errors + 1))
fi

if grep -q "t9.*FisherMan Slot" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} Template t9 mapped to FisherMan Slot"
else
    echo -e "${RED}✗${NC} Template t9 mapping incorrect"
    errors=$((errors + 1))
fi

echo ""

# Check 3: Safer obfuscation settings
echo "🔒 Checking obfuscation configuration..."
if grep -q "unicodeEscapeSequence: false" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} Unicode escape disabled (safer)"
else
    echo -e "${YELLOW}⚠${NC} Unicode escape might cause issues"
    warnings=$((warnings + 1))
fi

if grep -q "selfDefending: false" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} Self-defending disabled (safer)"
else
    echo -e "${YELLOW}⚠${NC} Self-defending might cause issues"
    warnings=$((warnings + 1))
fi

echo ""

# Check 4: Error handling present
echo "🛡️  Checking error handling..."
if grep -q "catch.*zipError" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} ZIP error handling implemented"
else
    echo -e "${RED}✗${NC} ZIP error handling missing"
    errors=$((errors + 1))
fi

if grep -q "Path sanitization" "src/app/api/download-simple-protected/route.ts" || grep -q "replace.*\[<>:\"\|?*\]" "src/app/api/download-simple-protected/route.ts"; then
    echo -e "${GREEN}✓${NC} Path sanitization implemented"
else
    echo -e "${RED}✗${NC} Path sanitization missing"
    errors=$((errors + 1))
fi

echo ""

# Check 5: Migration file exists
echo "📊 Checking database migration..."
if [ -f "supabase/migrations/007_fix_template_constraint.sql" ]; then
    echo -e "${GREEN}✓${NC} Migration file exists"
    
    if grep -q "t10.*t11.*t12.*t13" "supabase/migrations/007_fix_template_constraint.sql"; then
        echo -e "${GREEN}✓${NC} Migration includes new templates"
    else
        echo -e "${RED}✗${NC} Migration incomplete"
        errors=$((errors + 1))
    fi
else
    echo -e "${RED}✗${NC} Migration file missing"
    errors=$((errors + 1))
fi

echo ""

# Check 6: Template definitions
echo "📝 Checking template definitions..."
if grep -q "t10.*Castle Slot" "src/templates/index.ts"; then
    echo -e "${GREEN}✓${NC} Template t10 (Castle Slot) defined"
else
    echo -e "${YELLOW}⚠${NC} Template t10 definition might be missing"
    warnings=$((warnings + 1))
fi

if grep -q "t9.*Fisherman" "src/templates/index.ts"; then
    echo -e "${GREEN}✓${NC} Template t9 (Fisherman) defined"
else
    echo -e "${YELLOW}⚠${NC} Template t9 definition might be missing"
    warnings=$((warnings + 1))
fi

echo ""
echo "═══════════════════════════════════════════════"

# Summary
if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run database migration:"
    echo "   Open Supabase SQL Editor and run:"
    echo "   supabase/migrations/007_fix_template_constraint.sql"
    echo ""
    echo "2. Test downloads:"
    echo "   - Test template t9 (Fisherman Slot)"
    echo "   - Test template t10 (Castle Slot)"
    echo ""
    echo "3. Deploy when ready"
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ ${warnings} warning(s) found${NC}"
    echo "System should work but review warnings above"
    exit 0
else
    echo -e "${RED}✗ ${errors} error(s) found${NC}"
    if [ $warnings -gt 0 ]; then
        echo -e "${YELLOW}⚠ ${warnings} warning(s) found${NC}"
    fi
    echo ""
    echo "Please fix the errors above before deploying"
    echo "See QUICK_FIX_GUIDE.md for solutions"
    exit 1
fi
