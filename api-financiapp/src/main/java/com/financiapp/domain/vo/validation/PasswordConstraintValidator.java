package com.financiapp.domain.vo.validation;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.passay.LengthRule;
import org.passay.MessageResolver;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.PropertiesMessageResolver;
import org.passay.RuleResult;
import org.passay.WhitespaceRule;

public class PasswordConstraintValidator implements ConstraintValidator<PasswordValidation, String> {

    private MessageResolver messageResolver() throws FileNotFoundException, IOException {
        Properties propertiesMensajesPasswordValidator = new Properties();
        propertiesMensajesPasswordValidator.putAll(MensajesError.mensajesErrorParaPassword());
        return new PropertiesMessageResolver(propertiesMensajesPasswordValidator);
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        PasswordValidator validator = null;
        try {
            validator = new PasswordValidator(
                    messageResolver(),
                    new LengthRule(8, 16),
                    new WhitespaceRule()
            );
        } catch (IOException ex) {
            Logger.getLogger(PasswordConstraintValidator.class.getName()).log(Level.SEVERE, null, ex);
        }
        RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid()) {
            return true;
        }
        List<String> messages = validator.getMessages(result);

        String messageTemplate = messages
                .stream()
                .collect(Collectors.joining(","));

        context
                .buildConstraintViolationWithTemplate(messageTemplate)
                .addConstraintViolation()
                .disableDefaultConstraintViolation();

        return false;
    }
}
