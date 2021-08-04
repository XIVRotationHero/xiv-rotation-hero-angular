import {ActionEvent, LogLineEvent, RoleChangeEvent} from "./interfaces";
import {EventType} from "./enums/event-type";

export function logLineToActionEvent(logLine: LogLineEvent): ActionEvent {
  const [
    type,
    timestamp,
    playerId,
    playerName,
    attackId,
    attackName,
    attackTarget,
    attackTargetName,
    castDuration,
    checksum
  ] = logLine.line;

  return {
    type: EventType.ActionEvent,
    timestamp,
    playerId,
    playerName,
    attackId: parseInt(attackId),
    attackName,
    attackTarget,
    attackTargetName,
    castDuration: parseFloat(castDuration),
    checksum
  }
}

export function logLineToRoleChangeEvent(logLine: LogLineEvent): RoleChangeEvent {
  const [
    type,
    timestamp,
    classJobId,
    strengthValue,
    dexterityValue,
    vitalityValue,
    intelligenceValue,
    mindValue,
    pietyValue,
    attackPowerValue,
    directHitRateValue,
    criticalHitValue,
    _unknownValue1,
    healingMagicPotencyValue,
    determinationValue,
    skillSpeedValue,
    spellSpeedValue,
    _unknownValue2,
    tenacityValue,
    _unknownValue3,
    checksum
  ] = logLine.line;

  return {
    type: EventType.RoleChangeEvent,
    timestamp,
    classJobId: parseInt(classJobId, 10),
    strengthValue: parseInt(strengthValue, 10),
    dexterityValue: parseInt(dexterityValue, 10),
    vitalityValue: parseInt(vitalityValue, 10),
    intelligenceValue: parseInt(intelligenceValue, 10),
    mindValue: parseInt(mindValue, 10),
    pietyValue: parseInt(pietyValue, 10),
    attackPowerValue: parseInt(attackPowerValue, 10),
    directHitRateValue: parseInt(directHitRateValue, 10),
    criticalHitValue: parseInt(criticalHitValue, 10),
    _unknownValue1,
    healingMagicPotencyValue: parseInt(healingMagicPotencyValue, 10),
    determinationValue: parseInt(determinationValue, 10),
    skillSpeedValue: parseInt(skillSpeedValue, 10),
    spellSpeedValue: parseInt(spellSpeedValue, 10),
    _unknownValue2,
    tenacityValue: parseInt(tenacityValue, 10),
    _unknownValue3,
    checksum
  }
}
